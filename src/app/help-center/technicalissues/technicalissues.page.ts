import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface QuestionAndAnswer {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-technicalissues',
  templateUrl: './technicalissues.page.html',
  styleUrls: ['./technicalissues.page.scss'],
})
export class TechnicalissuesPage implements OnInit {

  questionsAndAnswers: QuestionAndAnswer[] = [
    { question: 'Q. I have registered on SmartHire but unable to verify my account.', answer: `A. Please check your spam folder too for the verification link.  If you are still unable to find it or are not able to verify the account, drop a query in further assistance page regarding the same and we will verify your account`, showAnswer: false },
    { question: 'Q. I am facing a technical issue and not able to access my account on SmartHire.', answer: `A. Please try opening the website in Chrome/ Mozilla and in incognito mode. In case you are using browsers like Internet Explorer, UC, or Safari, then chances are high that the error will come. It's recommended to use Chrome or Mozilla Firefox for a better user experience.
    Also, try pressing Ctrl+Shift+R keys to clear web browsing cache.
    If the problem still persists, then please take a screenshot of the page and send it here.  We will look into it and help you out.`, showAnswer: false },
    { question: 'Q. I am facing difficulties in using the SmartHire App.', answer: `Please make sure that you are using the latest version of the App. To check if you are using the latest version or not, please visit the Google Play Store and check is there is an update available for the App or not. If you are using the latest version and still facing difficulties then, kindly try to uninstall and then reinstall the App. If the problem still persists then, please send us a detail report of the problem through further assistance page so that we can look into it and assist you.`, showAnswer: false }
  ];

  ngOnInit() {
  }

  
  
}


