import { Component, OnInit } from '@angular/core';

interface QuestionAndAnswer {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  questionsAndAnswers: QuestionAndAnswer[] = [
    { question: 'Q. I am not receiving the password reset email?', answer: `1)Check the spam or junk mail folder
    2) Search for an email with the title Reset Your Account Password
    3) Wait five minutes for the password reset email to arrive`, showAnswer: false },
    { question: 'Q.  I have forgotten my password. How do I reset it?', answer: `A. While logging-in, just click on ‘Forgot Password’ and then enter your registered email address. We will send you a link to reset your password to your registered email address and then you can enter the new password.`, showAnswer: false },
    { question: 'Q. I am not receiving the password reset email?', answer: `1)Check the spam or junk mail folder
    2) Search for an email with the title Reset Your Account Password
    3) Wait five minutes for the password reset email to arrive`, showAnswer: false },
    { question: 'Q.  I have forgotten my password. How do I reset it?', answer: `A. While logging-in, just click on ‘Forgot Password’ and then enter your registered email address. We will send you a link to reset your password to your registered email address and then you can enter the new password.`, showAnswer: false }
 
  ];

  ngOnInit() {
  }

}
