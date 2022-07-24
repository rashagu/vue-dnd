
import {onBeforeMount, onMounted} from "vue";

// suppress the useLayoutEffect warning on server side.
export const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? onBeforeMount : onMounted;
