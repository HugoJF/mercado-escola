import React, {useMemo} from 'react';
import clsx             from 'clsx';

export type PaginationProps = {
    current?: number;
    last: number;
    delta?: number;
    onClick: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({current = 1, delta = 2, last, onClick}) => {
    const pages = useMemo(() => {
        const list = [];

        let temp = current;
        while (temp >= 1 && current - temp <= delta) {
            list.push(temp--);
        }

        temp = current + 1;
        while (temp <= last && temp - current <= delta) {
            list.push(temp++);
        }

        return list.sort((a, b) => a - b);
    }, [current, last, delta]);

    return <div className="flex justify-center">
        <div className="flex border rounded-lg divide-x">
            {pages.map(page => (
                <div
                    key={page}
                    onClick={() => onClick(page)}
                    className={clsx(
                        'px-5 py-3 text-center cursor-pointer', {
                            'bg-gray-200': current === page
                        }
                    )}
                >
                    {page}
                </div>
            ))}
        </div>
    </div>
};
