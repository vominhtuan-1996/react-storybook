import { StyleSheet } from 'react-native';

export const colors = {
  trackOff: '#334155',
  trackOn: '#10B981',
  trackError: 'rgba(239, 68, 68, 0.3)',
  thumb: '#FFFFFF',
  focusRing: '#34D399',
  labelDefault: '#E2E8F0',
  labelDisabled: '#64748B',
  descriptionDefault: '#64748B',
  descriptionError: '#F87171',
  spinner: '#64748B',
};

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 24;
const THUMB_SIZE = 20;
export const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - 4;

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  touchArea: {
    height: 44,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    width: TRACK_WIDTH,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  trackFocused: {
    borderWidth: 2,
    borderColor: colors.focusRing,
  },
  trackDisabled: {
    opacity: 0.5,
  },
  thumb: {
    height: THUMB_SIZE,
    width: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.thumb,
    marginLeft: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 4,
    minHeight: 44,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
});
