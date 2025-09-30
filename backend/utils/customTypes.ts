type JustDiffOp =
  | { kind: "E"; path: (string | number)[]; lhs?: any,rhs?:any,index?:number}
  | { kind: "A"; item: {kind:'D',lhs:any}; index?:number,path:(string|number)[]}
  | { kind: "A"; path: (string | number)[]; item:{kind:'N',rhs:any}; index?:number; rhs?: any };
  export default JustDiffOp