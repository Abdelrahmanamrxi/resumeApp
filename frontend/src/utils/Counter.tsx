import React,{type FC,useState , useEffect} from 'react'
type CounterProps={
    duration:number,
    end:number
}
const Counter:FC<CounterProps>= ({duration,end}):React.JSX.Element => {
 const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default Counter
