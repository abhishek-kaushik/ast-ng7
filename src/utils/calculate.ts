export class Calculate {

  value: string;

  sortOutput: string;

  output: string;

  /**
   *Check Numeric
   *
   * @param string value
   *
   * @returns boolean
   */
  private isNumeric(value: string): boolean {
    return !isNaN(parseFloat(value));
  }

  /**
   *Clean array
   *
   * @param Array arr Array List
   *
   * @returns Array<string>
   */
  private clean(arr: Array<string>): Array<string> {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '') {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  /**
   * Sort Input
   *
   * @returns void
   */
  private sortTree(): void {
    let outQ = '';
    const opS = [];
    let value: string;
    let valueArr: Array<string>;
    const oprts = {
      '^': {
        prec: 4,
        assoc: 'Right'
      },
      '/': {
        prec: 3,
        assoc: 'Left'
      },
      '*': {
        prec: 3,
        assoc: 'Left'
      },
      '+': {
        prec: 2,
        assoc: 'Left'
      },
      '-': {
        prec: 2,
        assoc: 'Left'
      }
    };
    value = this.value.replace(/\s+/g, '');
    valueArr = this.clean(value.split(/([\+\-\*\/\^\(\)])/));

    for (let i = 0; i < valueArr.length; i++) {
      const token = valueArr[i];
      if (this.isNumeric(token)) {
        outQ += token + ' ';
      } else if ('^*/+-'.indexOf(token) !== -1) {
        const o1 = token;
        let o2 = opS[opS.length - 1];
        while ('^*/+-'.indexOf(o2) !== -1
          && ((oprts[o1].assoc === 'Left'
            && oprts[o1].prec <= oprts[o2].prec)
            || (oprts[o1].assoc === 'Right' && oprts[o1].prec < oprts[o2].prec))) {
          outQ += opS.pop() + ' ';
          o2 = opS[opS.length - 1];
        }
        opS.push(o1);
      } else if (token === '(') {
        opS.push(token);
      } else if (token === ')') {
        while (opS[opS.length - 1] !== '(') {
          outQ += opS.pop() + ' ';
        }
        opS.pop();
      }
    }
    while (opS.length > 0) {
      outQ += opS.pop() + ' ';
    }
    this.sortOutput = outQ;
  }

  /**
   * Solve the array
   *
   * @param string value
   *
   * @returns void
   */
  solve(value: string): void {
    const res = [];
    let valueArr: Array<string>;
    this.value = value;
    this.sortTree();
    valueArr = this.sortOutput.split(' ');
    valueArr.pop();
    for (let i = 0; i < valueArr.length; i++) {
      if (this.isNumeric(valueArr[i])) {
        res.push(valueArr[i]);
      } else if (res.length > 1) {
        const a = res.pop();
        const b = res.pop();
        if (valueArr[i] === '+') {
          res.push(parseInt(a, 10) + parseInt(b, 10));
        } else if (valueArr[i] === '-') {
          res.push(parseInt(b, 10) - parseInt(a, 10));
        } else if (valueArr[i] === '*') {
          res.push(parseInt(a, 10) * parseInt(b, 10));
        } else if (valueArr[i] === '/') {
          res.push(parseInt(b, 10) / parseInt(a, 10));
        }
      } else if (res.length === 1 && valueArr[i] === '-') {
        const a = res.pop();
        res.push(parseInt(a, 10) * -1);
      }
    }
    if (res.length > 1) {
      this.output = 'error';
    } else {
      this.output = res.pop();
    }
  }

  /**
   * Returns Outout
   *
   * @returns string
   */
  get(): string {
    return this.output;
  }
}
