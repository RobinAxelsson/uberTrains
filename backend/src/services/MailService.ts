import nodemailer from 'nodemailer';
import { Booking } from '../models/Booking.entity';
import * as fs from 'fs';
import { Seat } from '../models/Seat.entity';
export interface IMailService {
  sendEmail(booking: Booking, seats: Seat[]): Promise<string>;
}
export class mailService implements IMailService {
  async sendEmail(booking: Booking, seats: Seat[]) {
    let sender = 'ubertrainsteam@gmail.com';
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: sender,
        pass: 'uberTrains2022',
      },
    });

    let htmlData = fs.readFileSync('./src/resources/template.html', 'utf8');
    htmlData = await this.formatHTML(booking, seats, htmlData);
    let info = await transporter.sendMail({
      from: sender,
      to: booking.email,
      subject: '✔ Din bokningsbekräftelse',
      html: htmlData,
    });
    return info.response;
  }
  private async formatHTML(booking: Booking, seats: Seat[], htmlData: string) {
    htmlData = htmlData
      .replace('BOOKINGNUMBER', booking.bookingNumber)
      .replace('BOOKINGDATE', booking.localDateTime)
      .replace('BOOKINGPRICE', booking.totalPrice.toString() + ':-');
    htmlData = await this.formatSeats(seats, htmlData);
    htmlData = await this.formatStations(booking, htmlData);
    return htmlData;
  }

  private async formatSeats(seats: Seat[], htmlData: string) {
    console.log(seats);

    if (seats.length == 1) {
      if (seats[0].trainUnit.name.startsWith('Vagn')) {
        htmlData = htmlData.replace(
          'BOOKINGSEAT',
          seats[0].trainUnit.name + ': Säte ' + seats[0].seatNumber.toUpperCase(),
        );
      } else {
        htmlData = htmlData.replace(
          'BOOKINGSEAT',
          'Vagn ' + seats[0].trainUnit.name + ': Säte ' + seats[0].seatNumber.toUpperCase(),
        );
      }
    } else {
      let seatText = '';
      seats.forEach((seat) => {
        if (seats[0].trainUnit.name.startsWith('Vagn')) {
          if (seatText == '') {
            seatText += seat.trainUnit.name + ': Säte ' + seat.seatNumber;
          } else {
            seatText += ', ' + seat.trainUnit.name + ': Säte ' + seat.seatNumber;
          }
        } else {
          if (seatText == '') {
            seatText += 'Vagn ' + seat.trainUnit.name + ': Säte ' + seat.seatNumber;
          } else {
            seatText += ', Vagn ' + seat.trainUnit.name + ': Säte ' + seat.seatNumber;
          }
        }
      });
      htmlData = htmlData.replace('BOOKINGSEAT', seatText);
    }

    return htmlData;
  }
  private async formatStations(booking: Booking, htmlData: string) {
    htmlData = htmlData
      .replace('BOOKINGSTARTSTATION', booking.routeEvents[0].location)
      .replace('BOOKINGENDSTATION', booking.routeEvents[booking.routeEvents.length - 1].location);
    return htmlData;
  }
}
export class mailServiceStub implements IMailService {
  //Dummy, doesn't & shouldn't do anything
  async sendEmail(booking: Booking) {
    return booking.email;
  }
}
