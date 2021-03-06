import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NavLink } from 'react-router-dom'

import { GET_CATEGORIES } from '../graphql/queries'

/**
 * Sidebar dynamic
 */
const SidebarDynamic = ({ match }) => {
  const subcategory = match.params.category
  const { data } = useQuery(GET_CATEGORIES)
  const items = data ? data.getMenuItems : []

  if (!subcategory) {
    return <span />
  }
  return (
    <>
      {items.flatMap(({ slug, subcategories }) =>
        slug === subcategory
          ? subcategories.map((sub) => (
              <NavLink
                key={sub.id}
                id={sub.id}
                to={`/${subcategory}/${sub.slug}`}
                className="sidebar__item"
                activeClassName="sidebar__item_active"
              >
                {sub.name}
              </NavLink>
            ))
          : [],
      )}
    </>
  )
}

export default SidebarDynamic
