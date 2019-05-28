import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from 'react-instantsearch-dom';
import './Scaffolding.scss';

const searchClient = algoliasearch(
  'OFCNCOG2CU',
  '77db8c6516725ef60b8a60223155f7ad'
);

function htmlDecode (input) {
  //eslint-disable-next-line
  return input.replace(/[^a-z0-9\s]/gi, '').replace(/(gt)/gi, '');
}

const Hit = ({ hit }) => {
  return (
    <article className="hit-card">
      {
        hit && (
          <a target="_blank" rel="noopener noreferrer"
            href={hit.repository && hit.repository.url ? hit.repository.url : `https://npmjs.com/package/${hit.name}`}>
            <div className="product-wrapper">
              <div className="product-summary">
                <div className="product-title">
                  <h3>{hit.name}</h3> 
                </div>
                <div className="product-avatar">
                  <img src={hit.owner.avatar} height="40" width="40"/>
                </div>
              </div>
              <div className="product-name">
                <h3>{hit.owner.name}</h3>
              </div>
              <div className="product-desc">
                <p>{ htmlDecode(hit.description) }</p>
              </div>
            </div>
          </a>
        ) 
      }
    </article>
  );
};

export default class Scaffolding extends React.Component {
  render() {
     return (
      <div>
        <InstantSearch searchClient={searchClient} indexName="npm-search">
          <Configure
            filters="computedKeywords:webpack-scaffold"
            hitsPerPage={16}
            analyticsTags={['webpack-scaffold']}
          />
          <div className="search-wrapper">
            <SearchBox />
          </div>
          <div className="hits-wrapper">
              <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>
    );
  }
}
