import { Component, OnInit } from '@angular/core';

interface QuestionAndAnswer {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-findjobs',
  templateUrl: './findjobs.page.html',
  styleUrls: ['./findjobs.page.scss'],
})
export class FindjobsPage implements OnInit {

  questionsAndAnswers: QuestionAndAnswer[] = [
    { question: `Q. I can't find jobs as per my preferences even by searching for it in the search bar. What should I do?`, answer: `A. If you're not able to find jobs as per your preferences by searching for it in the search bar, it is possible that we don't have jobs in that particular category/ location. However, hundreds of jobs are posted on our platform across various categories/locations every day. So, we suggest you keep checking our platform time to time to see if any new internships or jobs are posted in your preferred category/location.`
    , showAnswer: false },
    { question: 'Q. What is work from home job?', answer: `A.  A work from home job is a work opportunity for a fixed duration (1 week - 6 months) where you work from the comfort of your home and earn a stipend. The employer will send you all the work through emails or in some cases over internet-based text message applications along with the date of submission of the work. You can choose your work hours (unless asked by the employer to work on specific hours) and then submit the work to the employer through the email or to any other channel the employer may have asked you to upload it too.`, showAnswer: false },
    { question: 'Q. What is remote job?', answer: `A. A remote job is a full-time permanent job where you work remotely, i.e. from the comfort of your home, and earn a minimum CTC of 2 LPA.`, showAnswer: false },
    { question: 'Q. Do I need to pay in order to apply on SmartHire?', answer: `A. Absolutely not! It’s a free platform. You need not pay anything to apply on Internshala.`, showAnswer: false },
    { question: 'Q. I am an international student. Can I apply to jobs on SmartHire?', answer: `A. Yes, you can apply to the internships and jobs on Internshala. The details regarding visa and accommodation would be given by the employer once you are hired.`, showAnswer: false }
  ];

  ngOnInit() {
  }


}
