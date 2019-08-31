import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  array = ["Winter is coming next year", "What is your name", "Barcelone is my favourate club","Ottawa is the capital of canada","Ferrari is very fast car","New Delhi is the capital of India","Trees are the most important part of Life","Madrid is capital of spain"];
  index = 0;
  status: string = "Correct";
  QuestionArray: Array<any> = []
  ResponseArray: Array<any> = []

  ngOnInit() {
    this.QuestionArray = this.array[this.index].split(' ').filter((data) => data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    this.ResponseArray = []
  }

  shuffle(array: Array<string>) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  update(button: string, i: number, flag: boolean) {
    if (flag) {
      this.ResponseArray.push(...this.QuestionArray.splice(i, 1));
    } else {
      this.QuestionArray.push(...this.ResponseArray.splice(i, 1));
      this.QuestionArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    }
    if (!this.QuestionArray.length) {
      let str = this.array[this.index].split(' ').filter((data) => data).join(' ');
      let responseStr = this.ResponseArray.join(' ');
      if (str.trim() == responseStr.trim()) {
        this.status = "Correct Answer";
      } else {
        this.status = "Incorrect Answer";
      }
    }
  }

  previous() {
    if (this.index - 1 >= 0) {
      this.index--;
      this.QuestionArray = this.array[this.index].split(' ').filter((data) => data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      this.ResponseArray = []
    }
  }

  next() {
    if (this.index + 1 < this.array.length) {
      this.index++;
      this.QuestionArray = this.array[this.index].split(' ').filter((data) => data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      this.ResponseArray = []
    }
  }
}
