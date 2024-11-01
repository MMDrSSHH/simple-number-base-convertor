<script setup>
import { baseFromAtoB } from '@/utils/base-convert';
import { ref } from 'vue';

const input = ref("");
const inputBase = ref(10);
const outputBase = ref(2);
const numberBases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const showOutput = ref(false);

const inputRes = ref("");
const output = ref("");
const inputBaseRes = ref(null);
const outputBaseRes = ref(null);

// console.log(baseFromAtoB("10000", 2, 16));
const convertBase = () => {
    output.value = baseFromAtoB(input.value, inputBase.value, outputBase.value);
    inputRes.value = input.value;
    inputBaseRes.value = inputBase.value;
    outputBaseRes.value = outputBase.value;
    showOutput.value = true;
}
</script>

<template>
    <div class="w-full flex flex-col items-center">
        <h3 class="text-center mb-4 text-2xl font-black text-blue-800">Number Base Converter</h3>
        <div class="px-6 py-8 bg-slate-50 rounded-lg w-[90%] lg:w-[800px] shadow-lg">
            <form @submit.prevent="convertBase">
                <div class="flex flex-col md:flex-row gap-x-10 gap-y-4">
                    <label class="w-full">
                        Number:
                        <input v-model="input" class="border border-slate-300 w-full px-2 py-2 rounded-md"
                            placeholder="Enter a number to be converted" />
                    </label>

                    <div class="flex gap-x-6 w-full lg:w-1/3">
                        <div class="w-full">
                            <label class="flex flex-col">
                                From:
                                <select v-model="inputBase"
                                    class="outline-none border border-slate-300 p-2 rounded-md w-full">
                                    <option v-for="nb in numberBases" :key="nb" :value="nb">{{ nb }}</option>
                                </select>
                            </label>
                        </div>
                        <div class="w-full">
                            <label class="flex flex-col">
                                To:
                                <select v-model="outputBase"
                                    class="outline-none border border-slate-300 p-2 rounded-md w-full">
                                    <option v-for="nb in numberBases" :key="nb" :value="nb">{{ nb }}</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                <button type="submit" class="bg-blue-500 rounded-md py-2 text-slate-50 w-full mt-10">Convert</button>
            </form>

            <div v-if="showOutput" class="w-full border-t-[0.2px] border-gray-400 my-6"></div>

            <div v-if="showOutput" class="flex flex-col lg:flex-row gap-4 justify-center items-center">
                <span class="text-xl">({{ inputRes }})<sub>{{ inputBaseRes }}</sub></span>
                <span class="text-gray-600">Converted to:</span>
                <span class="text-xl">({{ output }})<sub>{{ outputBaseRes }}</sub></span>
            </div>
        </div>
    </div>
</template>