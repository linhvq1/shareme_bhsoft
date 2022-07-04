function Switch({publicPin, setPublicPin}) {
  
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div className="flex flex-col justify-center items-end ">
        {/*   Switch Container */}

        <div
          className={`md:w-14 md:h-7 w-10 h-6 flex items-center ${!publicPin ? 'bg-white border-solid border border-black' : 'bg-black'} rounded-full p-1 cursor-pointer`}
          onClick={() => {
            setPublicPin(!publicPin)
          }}
        >
          {/* Switch */}
          <div
            className={
              "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (!publicPin ? 'border-solid border border-black' : toggleClass)
            }
          ></div>
        </div>
      </div>
    </>
  );
}

export default Switch;