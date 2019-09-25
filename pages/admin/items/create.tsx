import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import { useFetcher } from 'rest-hooks';
import { ItemResource } from '../../../resources/item';
import { ToyNetworkError } from '../../../ToyNetworkError';

export default function CreateItem() {
  const createItem = useFetcher(ItemResource.createShape());

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: 0,
          height: 0,
          width: 0,
          length: 0,
          quantity: 0,
          accessories: []
        }}
        onSubmit={async (values, actions) => {
          try {
            const user = await createItem(values, {});
            console.log(user);
          } catch (e) {
            if (e && e.response && e.response.body && e.response.body.errors) {
              const errors: ToyNetworkError = e;
              errors.response.body.errors.forEach(e =>
                actions.setFieldError(
                  e.property,
                  e.constraints[Object.keys(e.constraints)[0]]
                )
              );
              return;
            }
            debugger;
          }
        }}
        render={({ handleSubmit, errors, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
            </fieldset>
            <fieldset>
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </fieldset>
            <fieldset>
              <label htmlFor="price">price</label>
              <Field type="number" name="price" />
              {errors.price && touched.price ? <div>{errors.price}</div> : null}
            </fieldset>
            <fieldset>
              <label htmlFor="height">height</label>
              <Field type="number" name="height" />
              {errors.height && touched.height ? (
                <div>{errors.height}</div>
              ) : null}
            </fieldset>
            <fieldset>
              <label htmlFor="width">width</label>
              <Field type="number" name="width" />
              {errors.width && touched.width ? <div>{errors.width}</div> : null}
            </fieldset>
            <fieldset>
              <label htmlFor="length">length</label>
              <Field type="number" name="length" />
              {errors.length && touched.length ? (
                <div>{errors.length}</div>
              ) : null}
            </fieldset>
            <fieldset>
              <label htmlFor="quantity">quantity</label>
              <Field type="number" name="quantity" />
              {errors.quantity && touched.quantity ? (
                <div>{errors.quantity}</div>
              ) : null}
            </fieldset>
            <fieldset>
              <label htmlFor="accessories">accessories</label>
              <FieldArray
                name="accessories"
                render={arrayHelpers => (
                  <div>
                    {values.accessories && values.accessories.length > 0 ? (
                      values.accessories.map((_accessory, index) => (
                        <div key={index}>
                          <Field name={`accessories.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push('')}
                      >
                        {/* show this when user has removed all accessories from the list */}
                        Add an accessory
                      </button>
                    )}
                  </div>
                )}
              />
              {errors.accessories && touched.accessories ? (
                <div>{errors.accessories}</div>
              ) : null}
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
      />
      <style jsx>{`
        label {
          text-transform: capitalize;
          display: block;
        }
        fieldset {
          margin-bottom: 1em;
        }
      `}</style>
    </>
  );
}
