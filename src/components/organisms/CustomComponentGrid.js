import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import molecules from 'components/molecules';
import { useHalfBorderedGridStyles } from '@mui-treasury/styles/grid';

const { ShowcaseWidget } = molecules;

const CustomComponentGrid = ({
  colWidth,
  components,
  getItemProps,
  noHeader,
}) => {
  const multiRowGridStyles = useHalfBorderedGridStyles({
    borderColor: '#e9e9e9',
    colWidth,
  });
  return (
    <Box
      py={{ xs: '2rem', sm: '3rem', md: '4rem' }}
      {...(noHeader && { pt: '0 !important' })}
    >
      {!noHeader && (
        <Box textAlign={'center'}>
          <h3>Custom Styles</h3>
        </Box>
      )}
      <Grid container classes={multiRowGridStyles}>
        {components.map(Component => {
          if (Component.isDefault) return null;
          const { ShowcaseWidgetProps } = getItemProps(Component);
          const {
            title: name = Component.name,
            description,
          } = Component.metadata;
          return (
            <Grid key={name} item {...colWidth} classes={multiRowGridStyles}>
              <ShowcaseWidget
                {...ShowcaseWidgetProps}
                description={description}
                name={name}
                height={'100%'}
              >
                <Component />
              </ShowcaseWidget>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

CustomComponentGrid.propTypes = {
  noHeader: PropTypes.bool,
  colWidth: PropTypes.shape({}),
  components: PropTypes.arrayOf(PropTypes.elementType),
  getItemProps: PropTypes.func,
};
CustomComponentGrid.defaultProps = {
  noHeader: false,
  colWidth: {
    xs: 12,
    sm: 6,
    md: 4,
  },
  components: [],
  getItemProps: () => {},
};

export default CustomComponentGrid;
