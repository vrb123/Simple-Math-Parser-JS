import {ADD,SUB} from './TokenTypes'

import Expression from './Expression'

export default class UnaryExpression extends Expression {
    
    constructor(type,expr){
        super();
        this.type=type;
        this.expr=expr;
    }

    eval(){
        let result=NaN;
        switch(this.type){
            case SUB:
                result=-this.expr.eval();
                break;
            case ADD:
                break;
            default:
                throw new Error("No such available unary operation...");
                break;
        }
        return result;
    }

}