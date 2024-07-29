import React, { useEffect } from 'react';
import './ListErrors.scss';
import { map, size } from 'lodash';

interface ErrorsDetail {
  field: string;
  message: string;
}

interface ListErrorsProps {
  errors: any;
}

export const ListErrors: React.FC<ListErrorsProps> = ({ errors }) => {
  const [errorsState, setErrorsState] = React.useState<ErrorsDetail[] | string>();

  useEffect(() => {
    if (errors?.details) {
      setErrorsState(errors?.details);
    } else {
      setErrorsState(errors || errors?.message);
    }
  }, [errors]);

  return (
    <div className="list-errors">
      {size(errorsState) > 0 && (
        <div className="list-errors-list">
          {map(errorsState as any, (error: ErrorsDetail, index) => {
            return (
              <div className="message-error" key={index}>
                {error?.message}
              </div>
            );
          })}
        </div>
      )}
      {typeof errorsState === 'string' && <div className="message-error">{errorsState}</div>}
    </div>
  );
};
