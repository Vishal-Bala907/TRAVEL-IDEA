"use client";
import Script from "next/script";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceInYears } from "date-fns";
//! create payment is called twice one for success and one for failure but we are only showing failed as success as payment is done in admin panel 
import {
  createPayment,
  makePayment,
  submitVisaRequest,
  sendMail,
} from "../server/basic/basic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MakePayment = ({ reqId, setStage, id }) => {
  // console.log("jai shree ram");

  console.log(reqId);

  const dispatch = useDispatch();
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  // console.log("visaRequests2", visaRequests);
  const phone = useSelector((state) => state.user.phone);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  // const [ReqId, setReqId] = useState(null);

  // useEffect(() => {
  //   const visaRequest2 = visaRequests;
  //   // if (!ReqId) {

  //   // }
  // }, []); // Empty dependency array to run only once

  const firstname = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.givenName
  );
  const lastname = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.surname
  );
  const usernames = firstname.map(
    (name, index) => name + " " + lastname[index]
  );

  const dateOfBirth = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.dateOfBirth
  );
  const TotalTravellers = visaRequests?.visaRequest?.length;

  const ages = dateOfBirth?.map((dob) => {
    const date = new Date(dob);
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return differenceInYears(new Date(), istDate);
  });

  const visas = useSelector((state) => state.visas?.visas || []);
  const Id = id;
  const router = useRouter();

  const visabyId = visas.find((item) => item.id === Number(Id));
  const AppointmentFees = Number(visabyId?.embassyFees?.appointmentFees);
  const TotalAppointmentFees = AppointmentFees * TotalTravellers;
  const EmbassyFess = visabyId?.embassyFees?.fees;
  const serviceFee = Number(visabyId?.serviceFee);
  const TotalServiceFee = serviceFee * TotalTravellers;
  const visaFee = Number(visabyId?.visaFee);
  const TotalvisaFee = visaFee * TotalTravellers;

  let NetTotal = 0;
  let TotalFeesByAge = 0;

  const travelerFees = [];

  if (ages && EmbassyFess) {
    ages.forEach((age, index) => {
      const fee = EmbassyFess.find(
        (fee) => age >= fee.minAge && age <= fee.maxAge
      );
      if (fee) {
        TotalFeesByAge += fee.fees;
        travelerFees.push({
          username: usernames[index],
          appointmentFee: AppointmentFees,
          serviceFee: serviceFee,
          embassyFee: fee.fees,
          visaFee: visaFee,
          totalFee: AppointmentFees + serviceFee + visaFee + fee.fees,
        });
      }
    });
  }

  NetTotal +=
    TotalAppointmentFees + TotalFeesByAge + TotalServiceFee + TotalvisaFee;

  const handlePayment = async () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    // console.log("total amt", NetTotal);
    // const response = await makePayment(NetTotal);
    // console.log(response);
    makePayment(NetTotal)
      .then((response) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
          amount: NetTotal * 100,
          currency: "INR",
          name: "TravelIdea",
          description: "Transaction",
          image: "/img/general/logoDark.png",
          order_id: response.id,
          handler: function (response) {
            // alert(
            //   Payment Successful. Payment ID: ${response.razorpay_payment_id}
            // );
            const paymentId = response.razorpay_payment_id;
            const orderId = response.razorpay_order_id;
            const sigId = response.razorpay_signature;
            paymentSuccessFull(paymentId, orderId, sigId, NetTotal)
              .then((data) => {
                router.push("/");
                toast.success("payment sucessfull... 😀😀", {
                  position: "top-right",
                });
              })
              .catch((e) => {
                console.log(e);
                toast.error("payment Failed... 😥😥", {
                  position: "top-right",
                });
              });
          },
          prefill: {
            name: name,
            email: email,
            contact: phone,
          },
          theme: {
            color: "#331749",
          },
        };

        var rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          const details = {
            paymentId: null,
            orderId: null,
            signature: null,
            amount: NetTotal,
            visaReqId: id,
            reqId: reqId,
            mobileNumber: phone,
          };

          // First usage: Log failed payment attempt
          createPayment(details)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
        rzp1.open();
      })
      .catch(() => {
        toast.error("payment Failed... 😥😥", {
          position: "top-right",
        });
      });
  };

  async function paymentSuccessFull(paymentId, orderId, sigId, NetTotal) {
    const details = {
      paymentId,
      orderId,
      signature: sigId,
      amount: NetTotal,
      visaReqId: id,
      reqId: reqId,
      mobileNumber: phone,
    };

    // Second usage: Log successful payment attempt
    createPayment(details)
      .then((data) => {
        sendTheMail(paymentId, orderId, NetTotal);
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
  async function sendTheMail(paymentId, orderId, NetTotal) {
    const messageBody = {
      recipient: email,
      msgBody: `Dear ${name},\n\nThank you for choosing TravelIdea. We are pleased to inform you that your payment has been successfully processed.\n\nYour payment ID is ${paymentId} and your order ID is ${orderId}. The net total for your order is ${NetTotal}.\n\nIf you have any questions or need further assistance, please do not hesitate to contact us.\n\nBest regards,\nThe TravelIdea Team`,
      subject: "Payment Confirmation",
    };

    sendMail(messageBody)
      .then((data) => {
        console.log("mail status:", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          mt={10}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Make Payment
          </Typography>

          <TableContainer component={Paper} sx={{ marginY: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Traveler</TableCell>
                  <TableCell align="right">Service Fee</TableCell>
                  <TableCell align="right">Appointment Fee</TableCell>
                  <TableCell align="right">Embassy Fee</TableCell>
                  <TableCell align="right">Visa Fee</TableCell>
                  <TableCell align="right">Total Fee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travelerFees.map((traveler, index) => (
                  <TableRow key={index}>
                    <TableCell>{traveler.username}</TableCell>
                    <TableCell align="right">₹{traveler.serviceFee}</TableCell>
                    <TableCell align="right">
                      ₹{traveler.appointmentFee}
                    </TableCell>
                    <TableCell align="right">₹{traveler.embassyFee}</TableCell>
                    <TableCell align="right">₹{traveler.visaFee}</TableCell>
                    <TableCell align="right">₹{traveler.totalFee}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <strong>Net Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>₹{NetTotal}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ marginTop: "20px" }}
          >
            Pay ₹{NetTotal}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MakePayment;
