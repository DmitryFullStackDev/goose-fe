import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = <T>(actions: T): T => {
    const dispatch = useDispatch()

    return bindActionCreators(actions as any, dispatch)
}
