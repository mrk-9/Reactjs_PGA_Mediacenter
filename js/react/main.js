const { InstantSearch, Hits, SearchBox, Highlight, RefinementList, HitsPerPage, Pagination, ScrollTo, Configure, Index } = ReactInstantSearch.Dom
const { connectSearchBox, connectRefinementList, connectHits } = ReactInstantSearch.Connectors
// console.log('ReactInstantSearch: ', ReactInstantSearch)

const config = {
  apiKey: 'fcb9f2e9d09404756042d1802a68c4c4',
  appId: '0TSYHLZXNU',
  indexName: 'media_center_press_releases'
}

const Helpers = {
  noDash(str) {
    return str.replace(/-|_/g, ' ')
  },
  uppercaseKeywords(str) {
    return str
      .split(' ')
      .map(w => Helpers.keywords.includes(w) ? w.toUpperCase() : w)
      .join(' ')
  },
  formatDate(date) {
    return new Date(date).toDateString().slice(4)
  },
  replace(str, from, to) {
    return str.replace(from, to)
  },
  noAdvisor(str) {
    return str.replace(/presented by/gi, '')
  },

  queryStringToObject(string) {
    const querystring = string.substring(1).split('&')

    return querystring.map(q => ({ [q.split('=')[0]]: q.split('=')[1] }))
    .reduce((result, item) => {
      const key = Object.keys(item)[0]
      result[key] = item[key]
      return result
    }, {})
    
  },

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  },
  clone(obj) {
    return JSON.parse(JSON.stringify(obj))
  },

  // CONSTANTS
  keywords: ['pga', 'grp', 'faq', 'msr', 'msrs', 'kpmg'] // same as _data/uppercase-keywords.yml
}

const CustomRefineList = ({ items = [], refine, currentRefinement }) => {
  return (
    <div className="dropdown dropdown-custom">
      <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        All Championships
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <button className="dropdown-item white-space-normal" onClick={() => refine([])}>All Championships</button>
      {
        items.map((i, idx) => {
          return (
            <button className="dropdown-item white-space-normal"
              onClick={() => refine(i.label)} key={idx} data-attr={(currentRefinement[0] === i.label && 'selected')}
            >
              {Helpers.replace(Helpers.noAdvisor(Helpers.uppercaseKeywords(Helpers.noDash(i.label))), 'kitchenaid', 'KitchenAid')}
            </button>
          )
        })
      }
      </div>
    </div>
  )
}


const ConnectedRefineList = connectRefinementList(CustomRefineList)

const CustomSearchBox = ({ currentRefinement, refine }) => {
  return (
    <input
      type="text"
      className="search-combined-control"
      id="search-input"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      placeholder="Keyword Search"
    />
  )
}

const ConnectedSearchBox = connectSearchBox(CustomSearchBox)
  

const HitsComponent = ({ hits }) => {
  return (
    <div className="row ">
      {
        hits.map((hit, idx) => {
          if (!hit['championship(s)']) {
            console.log('Does not exist: ', hit)
          }
          return (
          <div className="press-releases-search col-xl-12 col-xxl-6" key={hit.objectID}>
            <a href={hit.url}>
              <div className="card flex-row no-border mb-3 mb-md-4 align-items-center">
                <div className="card-image card-image-lg d-none d-md-block">
                  <img src={hit.photo_image} alt={hit.title} />
                </div>
                <div className="card-inner p-4">
                  <h6 className="text-primary text-capitalize">
                    {Helpers.formatDate(hit.posted_date)}
                    <span>
                      {
                        hit['championship(s)'] && hit['championship(s)'].map((i, idx) => (
                          ` | ${Helpers.replace(Helpers.noAdvisor(Helpers.uppercaseKeywords(Helpers.noDash(i))), 'kitchenaid', 'KitchenAid')}`
                        ))
                      }
                    </span>
                  </h6>
                  <h4 className="text-secondary title-serif font-medium mb-0">
                    <Highlight attribute="title" hit={hit} />
                  </h4>
                </div>
              </div>
            </a>
          </div> 
        )})
      }
    </div>
  )
}

const ConnectedHitsComponent = connectHits(HitsComponent)

class ReactSearch extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      query: '',
      filter: null
    }
  }

  componentDidMount() {
    const { search } = window

    const querystring = window.location.search.substring(1).split('&')
    const urlQueryState = Helpers.queryStringToObject(decodeURI(location.search))

    this.setState(urlQueryState)
  }

  getCurrentRefinement() {
    const refinement = this.state.filter ? [this.state.filter] : []
    return refinement
  }

  render() {
    const { appId, apiKey, indexName } = config

    return (
      <main className="main-content">
        <div className="main-content__top">
          <h1 className="text-secondary mb-4">Press Releases</h1>
          <InstantSearch
            appId={appId}
            apiKey={apiKey}
            indexName={indexName}
          >
            <div>
              <div className="search-resources">
                <div className="form-search">
                  <ScrollTo>
                    <SearchBox
                      submit={<span></span>}
                      defaultRefinement={this.state.query}
                      translations={{ placeholder: 'Keyword Search' }}
                    />
                  </ScrollTo>
                  
                    
                </div>
                <ConnectedRefineList
                  attribute="championship(s)"
                  defaultRefinement={this.getCurrentRefinement()}
                />
              </div>
            </div>
            <Index indexName={indexName}>
            <Configure hitsPerPage={10} />
            <ConnectedHitsComponent />
            <div className="mb-3">
              <Pagination />
            </div>
            </Index>
            

          </InstantSearch>
        </div>
      </main>
    )
  }
}


const selector = document.getElementById('react-algolia-press-releases')
ReactDOM.render(<ReactSearch />, selector)
