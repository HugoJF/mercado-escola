import React, {useEffect} from 'react';

export default function useAsyncEffect(func: () => Promise<void>, dependencies: React.DependencyList | undefined): void {
    useEffect(() => {
        func();
    }, dependencies);
}
