import {ADD,SUB,MULT,DIV,LEFT_BRACKET,NUM,RIGHT_BRACKET} from './TokenTypes'

export default class Lexer{
    
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