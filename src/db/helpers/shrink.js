(function(Setup){
    Setup(function(word){
        const repl = {
            CK:'K',
            CH:'C',
            DG:'G',
            WH:'W',
            MB:'M',
            WR:'R',
            SH:'S',
            NT:'N',
            ST:'S'
        };
        let code = word.toUpperCase();
            if(code.length > 4){
                code = code.charAt(0) + code.slice(1)
                                            .replace(/[AEIOU]/g, '');
            }
            if(code.length > 4) {
                code = code.replace(/CK|CH|DG|WH|MB|WR|SH|NT|ST/gi, (str)=>{
                    return repl[str]
                });
            }

        return code.split('').slice(0,4).join('');
    })
})((typeof exports!=='undefined'?function(fn){module.exports=fn;}:function(fn){this['Shrinkex']=fn;}))