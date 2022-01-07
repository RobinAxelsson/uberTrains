import emailjs from "emailjs-com";

export async function sendBookingInfo(booking, name, email){
    const {
        bookingNumber,
        localDateTime,
        startStation,
        endStation,
        totalPrice,
        bookedSeats,
      } = booking;
  
      const seatString = bookedSeats.reduce((prev, curr) => {
        prev += ` ${curr.seatNumber}`;
        return prev;
      }, "Sittplats:");
  
      var templateParams = {
        name: name,
        email: email,
        message: `Din betalning är genomförd,\n\n
        bokningsnummer: ${bookingNumber}\n
        datum: ${localDateTime}\n
        startstation: ${startStation}\n
        slutstation: ${endStation}\n
        pris: ${totalPrice} kr\n
        vagn: 1\n
        ${seatString}`,
      };
  
        let emailResponseStatus = await emailjs
          .send(
            "service_mn8idh9",
            "template_ovo61fm",
  
            templateParams,
  
            "user_qWBpxaLTMoG8JmPJ07PXT"
          )
        if(emailResponseStatus.status === 200){
            console.log("Email sent successful!")
        }
        else console.log("Error sending email, row 31 MailClient.js")
}