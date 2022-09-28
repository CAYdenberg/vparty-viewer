import React from 'react';
import { IconChevronRight } from './icons';
import { useChartData } from './store';

export const App: React.FC = () => {
  const { state, dispatch } = useChartData();

  console.log(state);

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
          <form className="mb-3">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="Add a country"
                />
              </div>
              <div className="control">
                <a className="button is-info">Add</a>
              </div>
            </div>
          </form>

          <div className="menu">
            <ul className="menu-list">
              <li>
                <a>
                  <i className="icon">
                    <IconChevronRight />
                  </i>
                  Canada
                </a>
                <ul>
                  <li>
                    <a>New Democratic Party</a>
                  </li>
                  <li>
                    <a>Conservative Party of Canada</a>
                  </li>
                  <li>
                    <a>Liberal Party</a>
                  </li>
                  <li>
                    <a>Green Party of Canada</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>United States of America</a>
                <ul>
                  <li>
                    <a>Democratic Party</a>
                  </li>
                  <li>
                    <a>Republican Party</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>

        <main className="column">
          <div className="level has-text-right">
            <form>
              <div className="select">
                <select>
                  <option>Populism Index</option>
                </select>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
