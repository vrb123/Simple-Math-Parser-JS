import {ADD,SUB,MULT,DIV} from './TokenTypes'

export default class BinaryExpression extends Expression {

    constructor(expr1,operation,expr2){
        super();
        this.expr1=expr1;
        this.operation=operation;
        this.expr2=expr2;
    }

    eval(){
        let result=NaN;
        switch(this.operation){
            case ADD:
                    result=this.expr1.eval()+this.expr2.eval();
                    break;
            case SUB:
                    result=this.expr1.eval()-this.expr2.eval();
                    break;
            case MULT:
                    result=this.expr1.eval()*this.expr2.eval();
                    break;
            case DIV:
                    result=this.expr1.eval()/this.expr2.eval();
                    break;
        }
        return result;
    }

}