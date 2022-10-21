import React, { useCallback } from 'react';
import { AddCountryForm } from './AddCountryForm';
import { MainChart } from './MainChart';
import { Menu } from './Menu/Menu';
import { useChartData, selectors as s, actions as a } from './store';

export const App: React.FC = () => {
  const { state, dispatch, request } = useChartData();
  console.log(state);

  const chartData = s.getChartData('v2xpa_popul')(state);
  const menuData = s.getMenuData(state);

  const toggleCountry = (country: string) => dispatch(a.toggleCountry(country));
  const highlight = (key: string) => dispatch(a.highlight(key));
  const unhighlight = (key: string) => dispatch(a.unhighlight(key));

  return (
    <div className="container">
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
        <aside className="column is-4">
          <AddCountryForm
            countries={state.countries}
            handleAddCountry={request}
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
          <div className="level">
            <form>
              <div className="select">
                <select>
                  <option>Populism Index</option>
                </select>
              </div>
            </form>
          </div>
          <div>
            <MainChart
              chartData={chartData}
              highlighted={state.ux.highlighted}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
