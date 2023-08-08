import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavserviceService {

  constructor() { }
  res: any;

  get(Item: string) {
    console.log("Top Bar Service enterd");
    if (Item == "apr") {
      this.res = "apr";
    }
    else if (Item == "brd") {
      this.res = "brd"
    } 
    else if (Item=='cms'){
      this.res = "cms"
    }
    else if (Item=='rmb'){
      this.res = "rmb"
    }
    else if (Item=='emp'){
      this.res = "emp"
    }
    else if(Item=='cocd'){
      this.res="cocd"
    }
    else if(Item=='ast'){
      this.res="ast"
    }
    else if(Item=='hol'){
      this.res="hol"
    }
    else if(Item=='inv'){
      this.res="inv"
    }
    else if(Item=='mrk'){
      this.res="mrk"
    }
    else if(Item=='rpt'){
      this.res="rpt"
    }
    else if (Item == "res") {
      this.res = "res";
    }    
    else if (Item == "brd") {
      this.res = "brd"
    } 
    else if (Item=='tvl'){
      this.res = "tvl"
    }
    else if (Item=='arn'){
      this.res = "arn"
    }
    else if (Item=='req'){
      this.res = "req"
    }
    else if (Item=='cms'){
      this.res = "cms"
    }
    else if(Item=='ast'){
      this.res="ast"
    }
    else if(Item=='allast'){
      this.res="allast"
    }
    else if(Item=='nonast'){
      this.res="nonast"
    }
  }

  
  returrnAns() {
    return this.res;
  }

}

