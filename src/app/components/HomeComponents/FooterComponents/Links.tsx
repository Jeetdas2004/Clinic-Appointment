import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Links = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-start items-start gap-y-6">
      <h2 className="text-xl font-bold">Links</h2>
      <div className="flex flex-col justify-start items-start gap-y-1">
        {children}
      </div>
    </div>
  );
};

export default Links;
