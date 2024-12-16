package com.fatec.scc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class Email {

  @Autowired
  private JavaMailSender mailSender;

  private String savpetsMail = "savpetsorg@gmail.com";

  public void sendEmail(String name, String clientEmail, String subject, String content) throws MessagingException {
    MimeMessage mail = mailSender.createMimeMessage();
    MimeMessageHelper message = new MimeMessageHelper(mail);

    message.setSubject(subject);
    message.setText(
        "Nome do usuário: " + name + "\n\n" +
            "Email do usuário: " + clientEmail + "\n\n" +
            "Mensagem: " + content);
    message.setFrom(savpetsMail);
    message.setTo(savpetsMail);

    mailSender.send(mail);
  }
}
