import React, { useCallback, useEffect, useRef } from 'react';
import { AddCountryForm } from './AddCountryForm';
import { ChartControlForm } from './ChartControlForm';
import { MainChart } from './MainChart';
import { Menu } from './Menu/Menu';
import { MobileCountryMenu } from './MobileCountryMenu';
import { useChartData, selectors as s, actions as a } from './store';
import { BeliefKeyT, getBeliefLabel } from './store/state';

export const App: React.FC = () => {
  const { state, dispatch, request } = useChartData();

  const chartData = s.getPlanarData(state);
  const timeline = s.getTimelineData(state);
  const menuData = s.getMenuData(state);

  const toggleCountry = (country: string) => dispatch(a.toggleCountry(country));
  const highlight = (key: string) => dispatch(a.highlight(key));
  const setYAxis = (next: keyof BeliefKeyT) => dispatch(a.setYAxis(next));
  const toggleMobileMenu = () => dispatch(a.toggleMobileMenu());

  const unhighlight = useCallback(() => {
    dispatch(a.unhighlight());
  }, [dispatch]);

  const closeMobileMenu = useCallback(() => {
    dispatch(a.closeMobileMenu());
  }, [dispatch]);
  const handleAddCountry = useCallback(
    (id: string) => {
      if (!state.data.find((country) => country.id === id)) {
        request(id);
      }
      if (state.ux.collapsedCountries.includes(id)) {
        dispatch(a.toggleCountry(id));
      }
    },
    [dispatch, request, state],
  );

  const isTimeline = !!timeline;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isTimeline && containerRef.current) {
      const el = containerRef.current;
      el.addEventListener('pointerdown', unhighlight);
      return () => {
        if (el) {
          el.removeEventListener('pointerdown', unhighlight);
        }
      };
    }
  }, [isTimeline, unhighlight]);

  return (
    <div className="container" ref={containerRef}>
      <div className="level is-center mt-4 mb-4">
        <div className="level-item has-text-centered">
          <h1 className="is-size-1">V-Party Data Explorer</h1>
        </div>
      </div>
      <div className="content mt-4 mb-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at
          tellus at augue dapibus ullamcorper. Nunc ut mattis mauris. Mauris
          tincidunt sodales interdum. Sed id posuere ipsum, in ullamcorper
          velit. Proin tristique id mi vitae rhoncus. Suspendisse ex lorem,
          mollis eu dui nec, viverra pulvinar justo. Donec eget turpis id augue
          sodales placerat. Ut vitae sapien convallis, pretium risus sed,
          aliquam leo.
        </p>
        <p>
          Quisque eu tellus justo. Aenean felis metus, faucibus vel accumsan
          eget, volutpat id ex. Sed porta ex in porta ultricies. Pellentesque
          faucibus, elit vel luctus efficitur, ligula sapien rutrum ligula, eu
          dictum augue tellus porttitor lacus. Vestibulum dignissim, risus at
          posuere posuere, ipsum nisl tempus dui, sed condimentum dolor nisi
          facilisis nunc. Etiam maximus aliquet nunc. Nullam gravida malesuada
          posuere. Phasellus consectetur ut tellus sit amet tempor. Nunc
          suscipit mauris sit amet arcu sollicitudin dignissim eu eu dui. Nunc
          porttitor erat in magna pretium volutpat. Nulla semper libero in orci
          vulputate, vitae aliquam massa dapibus.
        </p>
      </div>

      <div className="columns mt-4">
        <aside className="column is-4 is-hidden-mobile">
          <AddCountryForm
            countries={state.countries}
            handleAddCountry={handleAddCountry}
            isLoading={s.isLoading(state)}
          />

          <Menu
            menuData={menuData}
            toggleCountry={toggleCountry}
            highlight={highlight}
            unhighlight={unhighlight}
          />
        </aside>

        <main className="column">
          <div className="level is-mobile">
            <div className="level-left">
              <ChartControlForm yAxis={state.ux.yAxis} setYAxis={setYAxis} />
            </div>

            <div className="level-right is-hidden-tablet">
              <MobileCountryMenu
                isOpen={state.ux.mobileMenu}
                toggleOpen={toggleMobileMenu}
                requestClose={closeMobileMenu}
                activeCountries={s.activeCountries(state)}
                handleHideCountry={toggleCountry}
                addCountryForm={
                  <AddCountryForm
                    countries={state.countries}
                    handleAddCountry={handleAddCountry}
                    isLoading={s.isLoading(state)}
                  />
                }
              />
            </div>
          </div>

          <div>
            <MainChart
              planarData={chartData}
              highlighted={state.ux.highlighted}
              yAxisLabel={getBeliefLabel(state.ux.yAxis)}
              highlight={highlight}
              timelineData={timeline || undefined}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
