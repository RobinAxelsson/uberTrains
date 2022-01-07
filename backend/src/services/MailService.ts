import nodemailer from "nodemailer";
import { Booking } from "../models/Booking.entity";
import * as fs from "fs";
export interface IMailService {
  sendEmail(booking: Booking): Promise<string>;
}
export class mailService implements IMailService {
  async sendEmail(booking: Booking) {
    let sender = "ubertrainsteam@gmail.com";
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: sender,
        pass: "uberTrains2022",
      },
    });

    let htmlData = fs.readFileSync("./src/resources/template.html", "utf8");
    htmlData = await this.formatHTML(booking, htmlData);
    let info = await transporter.sendMail({
      from: sender,
      to: booking.email,
      subject: "✔ Din bokningsbekräftelse",
      html: htmlData,
    });
    return info.response;
  }
  private async formatHTML(booking: Booking, htmlData: string) {
    htmlData = htmlData
      .replace("BOOKINGNUMBER", booking.bookingNumber)
      .replace("BOOKINGDATE", booking.localDateTime)
      .replace("BOOKINGPRICE", booking.totalPrice.toString() + ":-");
    htmlData = await this.formatSeats(booking, htmlData);
    htmlData = await this.formatStations(booking, htmlData);
    return htmlData;
  }

  private async formatSeats(booking: Booking, htmlData: string) {
    if (booking.bookedSeats.length == 1) {
      htmlData = htmlData.replace(
        "BOOKINGSEAT",
        "Vagn " +
          booking.bookedSeats[0].trainUnit.name +
          ": Seat " +
          booking.bookedSeats[0].seatNumber
      );
    } else {
      let seatText = "";
      booking.bookedSeats.forEach((seat) => {
        if (seatText == "") {
          seatText +=
            "Vagn " + seat.trainUnit.name + ": Seat " + seat.seatNumber;
        } else {
          seatText +=
            ", Vagn " + seat.trainUnit.name + ": Seat " + seat.seatNumber;
        }
      });
      htmlData = htmlData.replace("BOOKINGSEAT", seatText);
    }

    return htmlData;
  }
  private async formatStations(booking: Booking, htmlData: string) {
    htmlData = htmlData
      .replace("BOOKINGSTARTSTATION", booking.routeEvents[0].location)
      .replace(
        "BOOKINGENDSTATION",
        booking.routeEvents[booking.routeEvents.length - 1].location
      );
    return htmlData;
  }
}
export class mailServiceStub implements IMailService {
  async sendEmail(booking: Booking) {
    return booking.email;
  }
}
