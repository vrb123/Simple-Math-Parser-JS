const ADD='+';
const SUB='-';
const MULT='*';
const DIV='/';
const LEFT_BRACKET='(';
const RIGHT_BRACKET=')';
const NUM='NUMBER';

class Token{

    constructor(type,text=""){

        this.type=type;
        this.text=text;
    }

}


class Lexer{
    
    constructor(text){
        this.text=text;
        this.pos=0;
        this.length=text.length;
        this.tokens=[];
    }

    isDigit(c){
        const digits="0123456789";
        return digits.includes(c);
    }

    isProperCharacter(c){
        const properCharacters="+-*/()";
        return properCharacters.includes(c);
    }

    tokenize(){
        while(this.pos < this.length ){
            if( this.isDigit( this.current() )  ){
                this.tokenizeNumber();
            }
            else if( this.isProperCharacter( this.current() ) ){
                this.tokenizeOperation();
            }
            this.next();
        }  
    }

    isDot(c){
        return c==='.';
    }

    tokenizeNumber(){
        const numArr=[ this.current(),  ];
        let nextCharacter=this.getNext();
        while( this.isDigit( nextCharacter ) || ( numArr.includes(".") === false && this.isDot(nextCharacter)) ) {
            numArr.push(nextCharacter);
            this.next();
            nextCharacter=this.getNext();
        }
        this.tokens.push( new Token( NUM, numArr.join('')  )  );
    }

    tokenizeOperation(){
        const operation=this.current();
        let type=null;
        switch(operation){
            case "+":
                type=ADD;
                break;
            case "-":
                    type=SUB;
                    break;
            case "*":
                    type=MULT;
                    break;
            case "/":
                    type=DIV;
                    break;
            case "(":
                    type=LEFT_BRACKET;
                    break;
            case ")":
                    type=RIGHT_BRACKET;
                    break;        
            default:
                    throw new Error("Unknown operation");
                    break;
        }
        this.tokens.push( new Token(type) );
                        
    }

    current(){
        return this.text[this.pos];
    }

    next(){
        this.pos++;
    }

    getNext(){
        const rel=this.pos+1;
        return this.text[rel];
    }

}

class Expression{

    constructor(){

    }

    eval() {  }
}

class NumberExpression extends Expression{
    
    constructor(text){
        super();
        this.text=text;
    }

    eval(){
        return Number(this.text);
    }

}

class UnaryExpression extends Expression {
    
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

class BinaryExpression extends Expression {

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

class Parser{
    
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

const text="2.5*4-1*5";

const lexer=new Lexer(text);

lexer.tokenize();

console.log("TOKENIZATION : ");

lexer.tokens.map( token => console.log(token.type+" -> "+token.text )  );

const parser = new Parser(lexer.tokens);

console.log("PARSING : ");

console.log(parser.parse());