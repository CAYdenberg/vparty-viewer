import React, { useCallback, useEffect, useRef } from 'react';
import { AddCountryForm } from './AddCountryForm';
import { ChartControlForm } from './ChartControlForm';
import { MainChart } from './MainChart';
import { Menu } from './Menu/Menu';
import { MobileCountryMenu } from './MobileCountryMenu';
import { QuestionDescription } from './QuestionDescription';
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
          This page presents a data explorer for the{' '}
          <a href="https://www.v-dem.net/data/v-party-dataset/">
            V-Party Dataset
          </a>{' '}
          comparing policy positions of various political parties between
          countries. In the chart below, each political party's position on a
          traditional economic left-right scale is plotted on the x-axis, and
          compared with different policy positions on the y-axis. The area of
          each data point is proportional to the party's vote share in the last
          election for which data are available. Highlighting any party overlays
          a chart showing how that party's views on the selected issue have
          changed over time. Detailed descriptions of methodology can be found
          in the{' '}
          <a href="https://www.v-dem.net/documents/8/vparty_briefing.pdf">
            original policy briefing.
          </a>
        </p>
        <p>
          <em>Disclosure:</em> I was not involved with collecting this data or
          producing the dataset, nor do I have any formal training in politcal
          science. <a href="https://caydenberg.io">My interests</a> lie in
          finding interesting ways to present data interactively. The
          countries/parties displayed by default reflect my biases with respect
          to country of origin (Canada) and its closest peer nations. (I have
          also hard-coded the traditional colours for those parties, but lack
          the capacity to do this for all countries - others are chosen
          randomly). Data from other countries can be loaded using the "Add a
          country" search below. If you spot problems or have suggestions please
          open an issue on the GitHub repo.
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

          <QuestionDescription belief={state.ux.yAxis} />

          <div>
            <MainChart
              planarData={chartData}
              highlighted={state.ux.highlighted}
              yAxisLabel={getBeliefLabel(state.ux.yAxis)}
              highlight={highlight}
              timelineData={timeline || undefined}
              overlayOpacity={1}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
