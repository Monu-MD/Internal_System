import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.css']
})
export class LeaveSummaryComponent {

  faqs = [
    {
      question: 'Q1. What is leave requests?',
      answer: 'Before going on a leave, one has to apply for leave in the leave requests page. Your leave application will be submitted to your manager for approval.',
      showAnswer: false
    },
    {
      question: 'Q2. Where can I see my submitted leaves?',
      answer: 'You can see the submitted leaves in View leaves link.',
      showAnswer: false
    },
    {
      question: 'Q3. Can I cancel my submitted leaves?',
      answer: 'Yes, you can cancel the submitted leaves if it has not been approved by your manager and your leave date has not passed.',
      showAnswer: false
    },
    {
      question: 'Q4.Can the submitted leaves be rejected?',
      answer: 'Yes, your manager has option to either accept or reject your leave application.',
      showAnswer: false
    },
    {
      question: 'Q5. Can I apply leave for the same date range twice?',
      answer: 'No, you will not be able to submit since there are overlapping of leaves.',
      showAnswer: false
    },
    {
      question: 'Q6. Can I apply leave on a holiday?',
      answer: 'No it is not possible to apply leave on a holiday. All the holidays list has been blocked for selection while applying leave.',
      showAnswer: false
    },
    {
      question: 'Q7. What if my all quaterly leave balance is utilised for that quater? Will i be able apply leave?',
      answer: 'Yes, you can apply for the leave which will be borrowed from the next quarter which will be treated as Advance leave.',
      showAnswer: false
    },
    {
      question: 'Q8. What is the maximum number of days we can avail leave?',
      answer: 'One can apply maximum of 10 days at an extent for Earned Leave and maximum of 4 leaves for Sick Leave (documents has to produced to admin/manager if your Sick Leave exceeds 4 days).',
      showAnswer: false
    },
    {
      question: 'Q9. Can I apply for a backdated Leave?',
      answer: 'Yes, Backdated leave can be applied to an extent of 1 Month.',
      showAnswer: false
    },
    {
      question: 'Q10. Where can I view my Leave Data?',
      answer: 'You can view your leave data either in the dashboard (Quick links) or View Leaves in Leave Request Module.',
      showAnswer: false
    },
    {
      question: 'Q11. Will I be tracked if I dont apply leave?',
      answer: 'Yes , Admin will mark you as absent and initiate a leave on your behalf for that day if you fail to apply leave.',
      showAnswer: false
    }
  ];

  toggleAnswer(index: number) {
    this.faqs[index].showAnswer = !this.faqs[index].showAnswer;
  }
}
