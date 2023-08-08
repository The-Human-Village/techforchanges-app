import citiesService from '@/api/services/cities/citiesService'
import dimensionsService from '@/api/services/dimensions/dimensionsService'
import filtersService from '@/api/services/filters/filtersService'
import languagesService from '@/api/services/languages/languagesService'
import localesService from '@/api/services/locales/localesService'
import membersService from '@/api/services/members/membersService'
import missionService from '@/api/services/mission/missionService'
import newsService from '@/api/services/news/newsService'
import objectsService from '@/api/services/objects/objectsService'
import searchService from '@/api/services/search/searchService'
import serviceProvidersService from '@/api/services/service-provider/serviceProvidersService'
import servicesService from '@/api/services/services-entity/servicesService'
import translationsService from '@/api/services/translations/translationsService'

const service = {
  languages: languagesService,
  dimensions: dimensionsService,
  cities: citiesService,
  members: membersService,
  services: servicesService,
  news: newsService,
  missions: missionService,
  translations: translationsService,
  locales: localesService,
  serviceProviders: serviceProvidersService,
  search: searchService,
  filters: filtersService,
  objects: objectsService,
}

export default service
