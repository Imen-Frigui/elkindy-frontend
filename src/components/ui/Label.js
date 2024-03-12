function Label({title, subtitle, id, className}) {
 return (
  <>
    <label className={"text-md text-kindyblue font-jost "+className} htmlFor={id} >{title} </label>
    {subtitle && <p className=" text-sm  text-gray-400 mb-4 ">
     {subtitle}
    </p>}
  </>
 )
}

export default Label
