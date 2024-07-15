const Arrow = (props: React.SVGAttributes<{}>) => {
  const { x = 0, y = 0, ...restProps } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={8}
      height={6}
      fill="none"
      {...props}
    >
      <path
        fill="#E9AE15"
        d="M6.631.09H1.368a1.1 1.1 0 0 0-.993.626 1.312 1.312 0 0 0 .162 1.38l2.631 3.188a1.1 1.1 0 0 0 1.663 0l2.631-3.187A1.312 1.312 0 0 0 7.625.716 1.1 1.1 0 0 0 6.63.09ZM1.5 1.34h4.937L4 4.354 1.5 1.341Z"
      />
    </svg>
  );
};

export default Arrow;
