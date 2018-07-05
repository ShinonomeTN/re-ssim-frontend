/*

    Tweaks

*/

if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

/*
    The ressim toolset
*/

const classNameHandlers = {
    // match : 17软件技术（国际IT）1 班
    gradeSubjectSpecialNumberClass: {
        pattern: /^\d{2}\D+[（|\(]\D+[\)|）]\d\D$/,
        spliter: i => i.replace(/\(|\)|（|）/g, "|").replace(/班/, '').splice(2, 0, "|").split("|")
    },
    // match : 17软件技术（国际IT）班
    gradeSubjectSpecial: {
        pattern: /^\d{2}\D+[（|\(]\D+[\)|）]\D$/,
        spliter: i => i.replace(/）|\)|班/g, '').replace(/\(|\)|（|）/g, "|").splice(2, 0, "|").split("|")
    },
    // match : 16数控技术班
    gradeSubject: {
        pattern: /^\d{2}\D+$/,
        spliter: i => i.splice(2, 0, "|").replace(/班/, '').split('|')
    },
    // match : 2017级中技护理班
    yearSubject: {
        pattern: /^\d{4}\D+$/,
        spliter: i => i.replace(/级/, '|').replace(/班/, '').split('|')
    },
    // match : // 16康复治疗技术2班
    gradeSubjectNumberClass: {
        pattern: /^\d{2}\D+\d\D$/,
        spliter: i => i.replace(/班/, '').match(/\d{1,2}|(\D+)/g)
    },
    // fallback, match all
    fallback: {
        pattern: /.*/,
        spliter: i => [i]
    }
}

if (!window.$ressim) {
    window.$ressim = {
        businesses : {
            splitClassNames: arrClassNames => arrClass.map(arrClassNames => {
                var result = {
                    name: arrClassNames
                }
                for (name in classNameHandlers) {
                    if (arrClassNames.match(classNameHandlers[name].pattern)) {
                        result.tokens = classNameHandlers[name].spliter(arrClassNames);
                        break;
                    }
                }
                return result;
            })
        },
        collections : {
            groupBy: (xs, key) => {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            }
        }
    }
}