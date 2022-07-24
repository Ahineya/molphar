import Axios from "axios";

class EmailService {
  send(to, subject, body) {
    Axios.post('http://localhost:3001/email', {
      to,
      subject,
      body
    });
  }
}

export const emailService = new EmailService();
