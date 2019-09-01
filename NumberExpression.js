import Expression from './Expression'

export default class NumberExpression extends Expression{
    
    constructor(text){
        super();
        this.text=text;
    }

    eval(){
        return Number(this.text);
    }

}