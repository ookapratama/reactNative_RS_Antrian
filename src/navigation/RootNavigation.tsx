import {createNavigationContainerRef} from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();

export const navigate = (name: any) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name);
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.goBack();
  }
};

export const reset = (name: any) => {
  if (navigationRef.isReady()) {
    navigationRef?.resetRoot({
      index: 0,
      routes: [{name: name}],
    });
  }
};
