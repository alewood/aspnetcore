using System.Collections.Generic;
using System;
using MimeKit;
using MimeKit.Text;
using System.Linq;

namespace LabWebApi.Email
{
public class EmailAddress
{
 public string Name { get; set; }
 public string Address { get; set; }
}
public class EmailMessage
{
 public EmailMessage()
 {
 ToAddresses = new List<EmailAddress>();
 FromAddresses = new List<EmailAddress>();
 }
 
 public List<EmailAddress> ToAddresses { get; set; }
 public List<EmailAddress> FromAddresses { get; set; }
 public string Subject { get; set; }
 public string Content { get; set; }
}
public interface IEmailConfiguration
{
 string SmtpServer { get; }
 int SmtpPort { get; }
 string SmtpUsername { get; set; }
 string SmtpPassword { get; set; }
 
 string PopServer { get; }
 int PopPort { get; }
 string PopUsername { get; }
 string PopPassword { get; }
}
 
public class EmailConfiguration : IEmailConfiguration
{
 public string SmtpServer { get; set; }
 public int SmtpPort  { get; set; }
 public string SmtpUsername { get; set; }
 public string SmtpPassword { get; set; }
 
 public string PopServer { get; set; }
 public int PopPort { get; set; }
 public string PopUsername { get; set; }
 public string PopPassword { get; set; }
}
public interface IEmailService
{
 void Send(EmailMessage emailMessage,string name,string address);
 List<EmailMessage> ReceiveEmail(int maxCount = 10);
}
 
public class EmailService : IEmailService
{
 private readonly IEmailConfiguration _emailConfiguration;
 
 public EmailService(IEmailConfiguration emailConfiguration)
 {
 _emailConfiguration = emailConfiguration;
 }
 
 public List<EmailMessage> ReceiveEmail(int maxCount = 10)
 {
 throw new NotImplementedException();
 }
 
 public void Send(EmailMessage emailMessage,string name,string address)
 {
 var message = new MimeMessage();
 message.To.Add(new MailboxAddress(name, address));
 message.From.Add( new MailboxAddress(_emailConfiguration.SmtpUsername.ToString()));

 message.Subject = emailMessage.Subject;
 //We will say we are sending HTML. But there are options for plaintext etc. 
 message.Body = new TextPart(TextFormat.Html)
 {
 Text = emailMessage.Content
 };
 
 //Be careful that the SmtpClient class is the one from Mailkit not the framework!
 using (var emailClient = new MailKit.Net.Smtp.SmtpClient())
 {
 //The last parameter here is to use SSL (Which you should!)
 emailClient.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.SmtpPort, true);
 
 //Remove any OAuth functionality as we won't be using it. 
 emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
 
 emailClient.Authenticate(_emailConfiguration.SmtpUsername, _emailConfiguration.SmtpPassword);
 
 emailClient.Send(message);
 
 emailClient.Disconnect(true);
 }
 }
}
}
