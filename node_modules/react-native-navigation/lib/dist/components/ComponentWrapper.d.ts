import * as React from 'react';
import { Store } from './Store';
import { ComponentEventsObserver } from '../events/ComponentEventsObserver';
export declare class ComponentWrapper {
    static wrap(componentName: string, OriginalComponentClass: React.ComponentType<any>, store: Store, componentEventsObserver: ComponentEventsObserver, ReduxProvider?: any, reduxStore?: any): React.ComponentClass<any>;
    static wrapWithRedux(WrappedComponent: React.ComponentClass<any>, ReduxProvider: any, reduxStore: any): React.ComponentClass<any>;
}
