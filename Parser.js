import {ADD,SUB,MULT,DIV,LEFT_BRACKET,NUM} from './TokenTypes'

export default class Parser{
    
    constructor(tokens){
        this.tokens=tokens;
        this.pos=0;
    }

    parse(){
        return this.expression().eval();
    }

    expression(){
        return this.binaryLowPrecedence();
    }

    binaryLowPrecedence(){
        let expr1=this.binaryHighPrecedence();
        while( this.current().type === ADD || this.current().type === SUB ){
            const type=this.current().type;
            this.next();
            expr1=new BinaryExpression(expr1,type,this.binaryHighPrecedence());
        }
        return expr1;
    }

    binaryHighPrecedence(){
        let expr1=this.unary();
        while(  this.current().type === MULT || this.current().type === DIV  ){
            const type=this.current().type;
            this.next();
            expr1=new BinaryExpression(expr1,type,this.unary());
        }
        return expr1;
    }

    unary(){
        if( this.current().type === SUB  ){
            this.next();
            return new UnaryExpression(SUB,this.single());
        }
        return this.single();
    }

    single(){
        if(this.current().type===NUM){
            const text=this.current().text;
            this.next();
            return new NumberExpression(text);
        }
        else if(this.current().type===LEFT_BRACKET){
            this.next();
            const expr=this.expression();
            this.next();
            return expr;
        }
    }

    current(){
        const current=this.tokens[this.pos];
        if(!current) return {type:"NAN"}
        return current;
    }

    next(){
        this.pos++;
    }

    getNext(){
        const next=this.pos+1;
        return this.tokens[next];
    }

}