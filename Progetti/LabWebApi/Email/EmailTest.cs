using System.Collections.Generic;
using System;
using MimeKit;
using MimeKit.Text;
using System.Linq;

namespace LabWebApi.Email
{
    public static class EmailTest{
       
       public static void Send(string name, string email, string subject, string message,IEmailService emailService)
       {
           EmailMessage _email= new EmailMessage();
           _email.Subject=subject;
           _email.Content=message;
          
           emailService.Send(_email,name,email);
       }
      
    }
}