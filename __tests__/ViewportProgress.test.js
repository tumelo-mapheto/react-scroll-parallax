/* global describe, it, IntersectionObserver */

import React from 'react';
import ReactDOM from 'react-dom';
import { ViewportProgress, ParallaxProvider } from 'react-scroll-parallax';

describe('Expect a <ViewportProgress> component', () => {
    it('to take a function as a child', () => {
        const node = document.createElement('div');
        let func = false;

        ReactDOM.render(
            <ParallaxProvider>
                <ViewportProgress isInView scrollY={0}>
                    {({ mapRef }) => {
                        func = true;
                        return <div ref={mapRef} />;
                    }}
                </ViewportProgress>
            </ParallaxProvider>,
            node
        );

        expect(func).toBe(true);
    });

    it('to throw when no ref is provided', () => {
        const node = document.createElement('div');
        let func = false;

        const render = () => {
            ReactDOM.render(
                <ParallaxProvider>
                    <ViewportProgress isInView scrollY={0}>
                        {() => null}
                    </ViewportProgress>
                </ParallaxProvider>,
                node
            );
        };

        expect(render).toThrow(
            "Must provide a ref of the element to track progress. Use the ({ mapRef }) from the render callback as the handler for the element's ref prop."
        );
    });

    it('to pass a an object containing the { progress, mapRef }w keys', () => {
        const node = document.createElement('div');
        let testObject = {};
        ReactDOM.render(
            <ParallaxProvider>
                <ViewportProgress isInView scrollY={0}>
                    {object => {
                        testObject = object;
                        return <div ref={object.mapRef} />;
                    }}
                </ViewportProgress>
            </ParallaxProvider>,
            node
        );
        expect(testObject).toMatchObject({
            progress: 0,
            mapRef: expect.any(Function),
        });
    });
});
