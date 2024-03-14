import {useTheme} from '@ui-kitten/components';
import React, {memo} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface HStackProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  mt?: number;
  mb?: number;
  ms?: number;
  me?: number;
  mh?: number;
  mv?: number;
  pt?: number;
  pb?: number;
  ps?: number;
  pe?: number;
  ph?: number;
  pv?: number;
  maxWidth?: number;
  minWidth?: number;
  padding?: number;
  margin?: number;
  border?: number;
  opacity?: number;
  padder?: boolean;
  alignSelfCenter?: boolean;
  itemsCenter?: boolean;
  onPress?(): void;
  onLongPress?: (event: GestureResponderEvent) => void;
  level?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | string;
  justify?:
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-start'
    | 'flex-end'
    | undefined;
}

const HStack: React.FC<HStackProps> = memo(
  ({
    style,
    children,
    padder,
    mt,
    mb,
    ms,
    me,
    mh,
    mv,
    pt,
    pb,
    ps,
    pe,
    ph,
    pv,
    maxWidth,
    minWidth,
    padding,
    margin,
    border,
    opacity,
    alignSelfCenter,
    itemsCenter,
    onPress,
    onLongPress,
    level,
    justify = 'space-between',
    ...props
  }) => {
    const theme = useTheme();
    const disabled = !!!onPress && !!!onLongPress;
    return (
      <>
        <TouchableOpacity
          onLongPress={onLongPress}
          disabled={disabled}
          activeOpacity={disabled ? 1 : 0.54}
          onPress={onPress}
          style={[
            {
              opacity: opacity,
              borderRadius: border,
              maxWidth: maxWidth,
              minWidth: minWidth,
              justifyContent: justify,
              alignItems: itemsCenter ? 'center' : 'flex-start',
              paddingHorizontal: padder ? 24 : ph,
              paddingVertical: padder ? 24 : pv,
              padding: padding,
              paddingTop: pt,
              paddingRight: pe,
              paddingBottom: pb,
              paddingLeft: ps,
              marginHorizontal: mh,
              marginVertical: mv,
              margin: margin,
              marginTop: mt,
              marginRight: me,
              marginBottom: mb,
              marginLeft: ms,
              flexDirection: 'row',
              backgroundColor: level
                ? theme[`background-basic-color-${level}`]
                : 'transparent',
            },
            style,
          ]}
          {...props}>
          {children}
        </TouchableOpacity>
      </>
    );
  },
);

export default HStack;
