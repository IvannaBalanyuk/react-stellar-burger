import { FC } from "react";
import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

type TLoaderSizes<T extends string> = {
  [key in T]: number;
};

const loaderSizes: TLoaderSizes<string> = {
  small: 16,
  medium: 24,
  large: 40
};

type Props = {
  size: string;
  inverse?: boolean;
};

const Loader: FC<Props> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};

export default Loader;
