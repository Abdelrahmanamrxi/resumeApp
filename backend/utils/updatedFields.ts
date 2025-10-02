
import JustDiffOp from "./customTypes"
export function UpdateDB(updatedFields:JustDiffOp[]){
    
    const mongooseUpdated:any={$set:{},$unset:{},$pullAll:{}}

    updatedFields.forEach((field)=>{
      
       if(field.kind ==="A"){
        const baseKey=field.path.map(p=>String(p)).join('.')
        const key = field.index !== undefined ? `${baseKey}.${field.index}` : baseKey;
        if(field.item.kind==="D"){    
              mongooseUpdated.$pullAll[baseKey] =[field.item.lhs];
        }
        if(field.item.kind==="N"){
            mongooseUpdated.$set[key]=field.item.rhs
        }
       }
         if(field.kind==="E"){
            const key=field.path.map(p=>String(p)).join('.')
            mongooseUpdated.$set[key]=field.rhs
        }
       }
    )   
    return mongooseUpdated
}