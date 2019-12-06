/*
 * Copyright (c) 2019-present, Jhuix (Hui Jin) <jhuix0117@gmail.com>. All rights reserved.
 * Use of this source code is governed by a MIT license that can be found in the LICENSE file.
 * Description: markdown showdowns editor
 */

import VueMDSE from './index';

export default VueMDSE;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueMDSE);
}
